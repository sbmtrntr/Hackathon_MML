from django.shortcuts import render

# Create your views here.
def title_view(request):
    return render(request, 'game_app/title.html')

def diff_select_view(request):
    return render(request, 'game_app/diff_select.html')

def how_to_play_view(request):
    return render(request, 'game_app/how_to_play.html')