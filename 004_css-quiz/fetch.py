import requests
from bs4 import BeautifulSoup
import json


url = 'https://www.w3schools.com/cssref/'
html = requests.get(url).content


soup = BeautifulSoup(html, 'html.parser')

data = {}

for row in soup.find_all('tr')[1:]:

    link = None
    description = None
    propertyName = None


    tempLinks = row.find_all('a')

    if tempLinks:
        propertyName = tempLinks[0].string

        link = f'https://developer.mozilla.org/en-US/docs/Web/CSS/{propertyName}'

    cells = row.find_all('td')

    if len(cells) > 1:
        description = cells[1].string

    if link and description and propertyName:
        data[propertyName] = {
            'link': link,
            'description': description
        }




with open('css_v2.json', 'w') as f:
    f.write(json.dumps(data))


""" for i in data.values():
    print(i['link'])

    print(requests.get(i['link']).status_code) """