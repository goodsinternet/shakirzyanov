#!/usr/bin/env python3
"""Пуш main в goodsinternet/shakirzyanov через SSH (paramiko),
т.к. в системе нет ssh-клиента, а dulwich 1.2 не несёт paramiko-вендора.
Запускать ПОСЛЕ добавления публичного ключа в Deploy keys репозитория."""
import paramiko
from dulwich import porcelain
from dulwich.client import SSHGitClient

KEY = "/home/z/my-project/.ssh/deploy_ed25519"
KNOWN_HOSTS = "/home/z/my-project/.ssh/known_hosts"
URL = "ssh://git@github.com/goodsinternet/shakirzyanov.git"
PATH = "/goodsinternet/shakirzyanov.git"
REPO = "/home/z/my-project"


class ParamikoWrapper:
    def __init__(self, client, channel):
        self._client = client
        self._ch = channel

    def read(self, n):
        return self._ch.recv(n)

    def write(self, data):
        self._ch.sendall(data)
        return len(data)

    def can_read(self):
        return self._ch.recv_stderr_ready()

    def stderr(self, n=4096):
        return self._ch.recv_stderr(n)

    def close(self):
        try:
            self._ch.close()
        finally:
            self._client.close()


class ParamikoVendor:
    """Реализует контракт dulwich.client.SSHVendor (dulwich 1.2)."""

    def __init__(self, key_filename, known_hosts):
        self.key_filename = key_filename
        self.known_hosts = known_hosts

    def run_command(self, host, argv, port=None, username=None,
                    protocol_version=None, key_filename=None, password=None, **kw):
        client = paramiko.SSHClient()
        client.load_system_host_keys(self.known_hosts)
        client.set_missing_host_key_policy(paramiko.RejectPolicy())
        client.connect(
            hostname=host,
            port=port or 22,
            username=username or "git",
            key_filename=key_filename or self.key_filename,
            look_for_keys=False,
            allow_agent=False,
            timeout=30,
        )
        channel = client.get_transport().open_session()
        cmd = " ".join(a.decode() for a in argv)
        channel.exec_command(cmd)
        return ParamikoWrapper(client, channel)


vendor = ParamikoVendor(KEY, KNOWN_HOSTS)

# Подменяем построитель транспорта, чтобы porcelain.push использовал наш вендор
import dulwich.porcelain as por

_orig = por.get_transport_and_path


def patched(location, config=None, **kwargs):
    if location.startswith("ssh://"):
        client = SSHGitClient("github.com", username="git", vendor=vendor)
        return client, PATH
    return _orig(location, config=config, **kwargs)


por.get_transport_and_path = patched

print("pushing main ->", URL)
result = porcelain.push(REPO, URL, "main")
print("push result:", result)
print("DONE")
