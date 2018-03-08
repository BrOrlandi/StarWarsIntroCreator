function createdIntros(){
    var source = '{{#if intros.length}}' +
    '<div id="box">'+
        '{{#each intros}}'+
        '<div>'+
            '<div class="circCont">'+
                '<button data-id="{{@index}}" class="removeButton circle fromMiddle">'+
                    '<span></span>'+
                  '</button>'+
            '</div>'+
            '<a href="#!/{{this.key}}" class="link">{{this.title}}</a>'+
        '</div>'+
        '{{/each}}'+
    '</div>'+
    '{{/if}}';
    this.template = Handlebars.compile(source);

    this.element = $('#createdIntros');

    this.remove = function(index){
        var that = this;
        swal({
            html: true,
            title: '<h2 style="font-family: StarWars;">remove intro</h2>',
            text: '<p style="text-align: justify">'+
            'This will not remove the intro from the database. Are you sure you want to remove the intro from this browser?<br>'+
            '</p>',
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              animation: "slide-from-top"
        },function(confirm){
            if(confirm){
                var intros = JSON.parse(localStorage.StarWarsIntros);
                intros.splice(index,1);
                localStorage.StarWarsIntros = JSON.stringify(intros);
                that.load();
            }
        });
    }

    this.load = function(){
        var intros = localStorage.StarWarsIntros ? JSON.parse(localStorage.StarWarsIntros) : [];

        var html = $(this.template({intros:intros}));
        var that = this;
        html.find('.removeButton').click(function(e){
            that.remove(e.target.dataset.id);
        });
        this.element.html(html);
    };

    var getTitle = function(intro){
        var see = ['title','episode','logo','text'];
        for(var i=0;i<see.length;i++){
            var property = intro[see[i]];
            if(property.trim() !== ''){
                return property.slice(0,50);
            }
        }
    }

    this.save = function(key,intro){
        var intros = localStorage.StarWarsIntros ? JSON.parse(localStorage.StarWarsIntros) : [];
        var title = getTitle(intro);
        intros.push({title: title, key: key});
        localStorage.StarWarsIntros = JSON.stringify(intros);
    }
};

CreatedIntros = new createdIntros();
CreatedIntros.load();
