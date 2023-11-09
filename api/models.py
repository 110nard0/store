from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid


class CustomUserManager(BaseUserManager):
    """
    """

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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True, db_index=True, blank=False)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    password = models.CharField(max_length=255)
    preference = models.CharField(max_length=25, blank=True, null=False)

    lga = models.CharField(max_length=64, blank=True)
    state = models.CharField(max_length=32, blank=True)
    address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_logged_in = models.BooleanField(default=False)

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


class WaitlistUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    email = models.EmailField(unique=True, blank=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Waitlist user #{self.id}: {self.email}"


class Preference(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    preference = models.CharField(max_length=64)

    def __str__(self):
        return self.preference


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=64)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.category


class Size(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sizename = models.CharField(max_length=64)
    sizevalue = models.CharField(max_length=4)

    def __str__(self):
        return self.sizename


class Colour(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    colour = models.CharField(max_length=64)
    hex = models.CharField(max_length=7)

    def __str__(self):
        return self.colour


class Product(models.Model):
    """
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    show = models.BooleanField(default=True)
    # images = models.ImageField(upload_to='products/', blank=True, null=True)
    images = models.CharField(max_length=255)
    key = models.CharField(max_length=32, null=True)

    preference = models.ForeignKey(Preference, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    colour = models.ForeignKey(Colour, on_delete=models.CASCADE)

    def __str__(self):
        return f"Item #{self.id} ({self.product})\
                : {self.get_preference_display()} - {self.get_category_display()}\
                - {self.get_size_display()} - {self.get_color_display()}"

    # front_image = models.ImageField(upload_to='products/')
    # back_image = models.ImageField(upload_to='products/')


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

    def __str__(self):
        return f"Cart #{self.id} owned by {self.user}"


class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def total_price(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"Cart Item #{self.id} in Cart #{self.cart.id}"


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    cart = models.ForeignKey(
        Cart, on_delete=models.SET_NULL, blank=False, null=True)
    ordered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=16,
        choices=[('processing', 'Processing'),
                 ('successful', 'Successful'), ('failed', 'Failed'),
                 ('pending', 'Pending'), ('completed', 'Completed')]
    )

    @property
    def address(self):
        return self.user.address

    def total_price(self):
        return self.cart.total_price() if self.cart else 0

    def __str__(self):
        return f"Order #{self.id} in Cart #{self.cart.id}"
