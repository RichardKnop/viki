(function($){
    var Player = Backbone.Model.extend({
        defaults: {
            points: 0
        },

        updatePoints: function( strWeight, dexWeight, intWeight ) {
            var points = strWeight * this.get("str");
            points += dexWeight * this.get("dex");
            points += intWeight * this.get("int");
            this.set({
                points: points
            });
        }
    });

    var PlayerCollection = Backbone.Collection.extend({
        model: Player
    });

    var ControlsView = Backbone.View.extend({
        el: $("#controls"),

        events: {
            "click button": "updatePoints"
        },

        updatePoints: function() {
            var strWeight = parseInt($("select[name=strength_weight]").val(), 10);
            var dexWeight = parseInt($("select[name=dexterity_weight]").val(), 10);
            var intWeight = parseInt($("select[name=intelligence_weight]").val(), 10);

            _(this.collection.models).each(function( player) {
                player.updatePoints(strWeight, dexWeight, intWeight);
            }, this);
        }
    });

    var PlayerView = Backbone.View.extend({
        tagName: "<tr>",

        initialize: function() {
            _.bindAll(this, "render");
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            $(this.el).empty();
            $(this.el).append($("<td>" + this.model.get("name") + "</td>"));
            $(this.el).append($("<td>" + this.model.get("job") + "</td>"));
            $(this.el).append($("<td>" + this.model.get("str") + "</td>"));
            $(this.el).append($("<td>" + this.model.get("dex") + "</td>"));
            $(this.el).append($("<td>" + this.model.get("int") + "</td>"));
            $(this.el).append($("<td>" + this.model.get("points") + "</td>"));
            return this;
        }
    });

    var PlayerTableView = Backbone.View.extend({
        el: $("#players table tbody"),

        initialize: function() {
            var that = this;

            _.bindAll(this, "render");
            this.collection = new PlayerCollection();

            $.getJSON( "/api/v1/players.json", function( playersData ) {
                playersData.forEach(function( playerData ) {
                    var player = new Player();
                    player.set({
                        name: playerData.name,
                        job: playerData.job,
                        str: playerData.str,
                        dex: playerData.dex,
                        int: playerData.int
                    });
                    that.collection.add(player);
                });
                that.render(); // self rendering view
            });
        },

        render: function() {
            var that = this;

            var controlsView = new ControlsView({
                collection: this.collection
            });

            _(this.collection.models).each(function( player) {
                var playerView = new PlayerView({
                    model: player
                });
                $(that.el).append(playerView.render().$el);
            }, this);

            return this;
        }
    });

    var playerTableView = new PlayerTableView();
})(jQuery);