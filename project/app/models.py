from django.db import models

# Create your models here.
class ScoreData(models.Model):
    name = models.CharField(max_length = 100, primary_key=True)
    score = models.IntegerField(default=0)
    def __str__(self):
        return '<Result: ' + self.name + ', ' + self.score + '>'