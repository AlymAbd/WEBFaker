import environ
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

env = environ.Env

class EnvEnv(env):
    def notnull(self, var, default=None):
        value = self.get_value(var)
        return value if value != '' else default
