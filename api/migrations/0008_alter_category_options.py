# Generated by Django 4.2.5 on 2023-11-03 06:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_cartitem_cart_alter_category_key_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
    ]
