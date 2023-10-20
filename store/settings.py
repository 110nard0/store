"""
Django settings for store project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from datetime import timedelta
from decouple import config
from pathlib import Path
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# ALLOWED_HOSTS = ['trgst.com', 'www.trgst.com']
ALLOWED_HOSTS = ['3.75.158.163', '3.125.183.140', '35.157.117.28']


# Application definition

INSTALLED_APPS = [
    'api',
    # 'allauth',
    # 'allauth.account',
    # 'allauth.socialaccount',
    # 'allauth.socialaccount.providers.google'
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.staticfiles',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
]

MIDDLEWARE = [
    # 'allauth.account.middleware.AccountMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'store.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'store.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': dj_database_url.parse(config("DATABASE_URL"))
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Africa/Lagos'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'api.CustomUser'
# USER_MODEL_USERNAME_FIELD = 'email'

AUTHENTICATION_BACKENDS = [
    # 'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
]

# Use Django's standard `django.contrib.auth` permissions,
# or allow read-only access for unauthenticated users.

# Rest Framework configuration
REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    # ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}


# Django-Rest-Auth configurations

SITE_ID = 1

# REST_AUTH = {
#     'REGISTER_SERIALIZER': 'api.serializers.CustomRegisterSerializer',
#     'USE_JWT': True,
#     'JWT_AUTH_COOKIE': 'auth-token',
#     'JWT_AUTH_REFRESH_COOKIE': 'refresh-token',
#     'JWT_AUTH_HTTPONLY': False,
# }


# Django-All-Auth configurations

# ACCOUNT_USER_MODEL_USERNAME_FIELD = None
# ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
# ACCOUNT_UNIQUE_EMAIL = True
# ACCOUNT_USERNAME_REQUIRED = False
# ACCOUNT_CONFIRM_EMAIL_ON_GET = True
# LOGIN_URL = 'http://localhost:8000/api/login'


# JWT Authentication configurations

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}


# Email configuration

EMAIL_BACKEND = config('EMAIL_BACKEND')
EMAIL_USE_SSL = config('EMAIL_USE_SSL', default=True, cast=bool)
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_PORT = int(config('EMAIL_PORT'))

# Ensure that not all origins are allowed, and then explicitly specify allowed origins

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]


# Special settings for cookies or any special headers

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    "content-type",
    "accept",
    "origin",
    "Authorization",
    "x-csrftoken",
]


# Routing configurations

# APPEND_SLASH = False


# Production configurations

# Only communicate with site using HTTPS

# SECURE_HSTS_SECONDS = 31536000

# Redirect all requests to HTTPS if they come in as HTTP

# SECURE_SSL_REDIRECT = True

# Send Cookies over non-secure connections

# SESSION_COOKIE_SECURE = True

# Send CSRF token over non-secure connections

# CSRF_COOKIE_SECURE = True
