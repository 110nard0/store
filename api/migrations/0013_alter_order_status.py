# Generated by Django 4.2.5 on 2023-11-08 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_order_cart_alter_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('successful', 'Successful'), ('failed', 'Failed'), ('pending', 'Pending'), ('completed', 'Completed')], max_length=16),
        ),
    ]
