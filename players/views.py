import operator

from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.views.generic import View

from . import PLAYERS_DATA


class PlayersAPIView(View):

    def get(self, request, *args, **kwargs):
        return JsonResponse(PLAYERS_DATA, safe=False)


class PlayersJSPageView(View):

    template_name = "players/players_js.html"

    def get(self, request, *args, **kwargs):
        return render_to_response(self.template_name, {})


class PlayersPageView(View):

    template_name = "players/players.html"
    strength_weight = 0
    dexterity_weight = 0
    intelligence_weight = 0

    def get(self, request, *args, **kwargs):
        return render_to_response(
            self.template_name,
            {'data': PLAYERS_DATA},
        )

    def post(self, request, *args, **kwargs):
        try:
            self.strength_weight = request.POST["strength_weight"]
            self.dexterity_weight = request.POST["dexterity_weight"]
            self.intelligence_weight = request.POST["intelligence_weight"]
        except KeyError:
            pass

        for player in PLAYERS_DATA:
            point = self._calculate_weight(
                strength=int(player["str"]),
                dexterity=int(player["dex"]),
                intelligence=int(player["int"]),
            )
            player.update({'point': point})

        return render_to_response(
            self.template_name,
            {'data': PLAYERS_DATA},
        )

    def _calculate_weight(self, strength, dexterity, intelligence):
        return reduce(operator.add, (
            int(self.strength_weight) * int(strength),
            int(self.dexterity_weight) * int(dexterity),
            int(self.intelligence_weight) * int(intelligence),
        ))