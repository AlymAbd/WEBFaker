import environ

env = environ.Env

class EnvEnv(env):
    def notnull(self, var, default=None):
        value = self.get_value(var)
        return value if value != '' else default
