from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.create_user(email, password, **extra_fields)
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    """
    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True, blank=False)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    password = models.CharField(max_length=255)
    preference = models.CharField(max_length=25, choices=[
        ('minimal', 'Minimal'),
        ('alte', 'Alte'),
        ('modern', 'Modern/Chic'),
    ], blank=False, null=False)

    # name = models.CharField(max_length=64)
    # phone_number = models.CharField(max_length=15, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="customuser_set",
        related_query_name="customuser",
        verbose_name='groups'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="customuser_set",
        related_query_name="customuser",
        verbose_name='user permissions'
    )

    class Meta:
        default_related_name = 'customuser'
        db_table = 'custom_user'

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f"User #{self.id}: {self.email}"


class Product(models.Model):
    """
    """
    # Choices for product fields
    CATEGORIES = [
        ('minimal', 'Minimal'),
        ('alte', 'Alte'),
        ('modern', 'Modern/Chic'),
    ]

    CLOTHING_TYPES = [
        ('TOP', 'Tops'),
        ('BOT', 'Bottoms'),
        ('HAT', 'Hats'),
    ]

    SIZES = [
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
    ]

    COLORS = [
        ('red', 'Red'),
        ('green', 'Green'),
        ('blue', 'Blue'),
        ('white', 'White'),
        ('black', 'Black'),
    ]

    # Product fields
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    category = models.CharField(max_length=25, choices=CATEGORIES)
    type = models.CharField(max_length=3, choices=CLOTHING_TYPES)
    size = models.CharField(max_length=4, choices=SIZES)
    color = models.CharField(max_length=8, choices=COLORS)

    # front_image = models.ImageField(upload_to='products/')
    # back_image = models.ImageField(upload_to='products/')

    def __str__(self):
        return f"Item #{self.id} ({self.title}) : {self.get_type_display()} - {self.get_size_display()} - {self.get_color_display()}"


class Order(models.Model):
    """
    """
    # address = models.TextField(blank=True, null=True)
    pass


class WaitlistUser(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(unique=True, blank=False)

    def __str__(self):
        return f"Waitlist user #{self.id}: {self.email}"
