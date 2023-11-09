# Generated by Django 4.2.5 on 2023-11-01 04:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_customuser_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=64)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('key', models.CharField(default=1, max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Colour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('colour', models.CharField(max_length=64)),
                ('hex', models.CharField(max_length=7)),
                ('key', models.CharField(default=1, max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preference', models.CharField(max_length=64)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('key', models.CharField(default=1, max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sizename', models.CharField(max_length=64)),
                ('sizevalue', models.CharField(max_length=4)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('key', models.CharField(default=1, max_length=32)),
            ],
        ),
        migrations.RemoveField(
            model_name='product',
            name='type',
        ),
        migrations.AddField(
            model_name='product',
            name='images',
            field=models.ImageField(blank=True, null=True, upload_to='products/'),
        ),
        migrations.AddField(
            model_name='product',
            name='show',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='stock',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='preference',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.preference'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='color',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.colour'),
        ),
        migrations.AlterField(
            model_name='product',
            name='size',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.size'),
        ),
    ]
