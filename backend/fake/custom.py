import environ
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(os.path.join(BASE_DIR.parent, '.env'))

env = environ.Env

class EnvEnv(env):
    def notnull(self, var, default=None):
        value = self.get_value(var)
        return value if value != '' else default

env = EnvEnv(
    DEBUG=(bool, False)
)

if env('DEBUG'):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rest.settings')
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
