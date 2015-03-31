import os
import json
from django.conf import settings


PLAYERS_DATA = json.load(open(os.path.join(
    settings.BASE_DIR, "players", "fixtures", "data.json",
)))