import random

RANDOM_METHODS = {
    'python__randrange': {'title': 'Random integer range', 'options': {'from': 0, 'to': 100}, 'type': 'python', 'format': 'fInteger'},
    'python__str_choice': {'title': 'Own string choice', 'options': {'choice': []}, 'type': 'python', 'format': 'fString'},
    'python__int_choice': {'title': 'Own integer choice', 'options': {'choice': []}, 'type': 'python', 'format': 'fInteger'},
    'python__date_choice': {'title': 'Own date choice', 'options': {'choice': []}, 'type': 'python', 'format': 'fDate'},
    'python__datetime_choice': {'title': 'Own datetime choice', 'options': {'choice': []}, 'type': 'python', 'format': 'fDatetime'},
    'custom__int_input': {'title': 'Own input', 'options': None, 'type': 'own', 'format': 'fInteger'},
    'custom__str_input': {'title': 'Own input', 'options': None, 'type': 'own', 'format': 'fString'},
    'custom__date_input': {'title': 'Own input', 'options': None, 'type': 'own', 'format': 'fDate'},
    'custom__datetime_input': {'title': 'Own input', 'options': None, 'type': 'own', 'format': 'fDatetime'},
}
