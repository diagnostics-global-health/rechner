#!/usr/bin/env python3

import urllib.request
from bs4 import BeautifulSoup


def get_incid():
    user_agent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7"
    url = "https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Fallzahlen.html"
    headers = {
        "User-Agent": user_agent,
    }
    request = urllib.request.Request(url, None, headers)
    response = urllib.request.urlopen(request)
    html = response.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    # Incidence is last row of the only table, penultimate bold number
    return soup.findAll("tr")[-1].findAll("strong")[-2].string


def replace_values(filename, id_val_pairs):
    with open(filename, "r") as file:
        html = file.read()
        soup = BeautifulSoup(html, "html.parser")
        for id, val in id_val_pairs.items():
            soup.find(id=id)["value"] = val
    with open(filename, "w") as file:
        file.write(soup.prettify())


def main():
    incid = get_incid()
    print(f"Found RKI incidence: {incid}")
    files = ["index.html", "de/index.html"]
    for f in files:
        print(f"  - updating {f}")
        replace_values(f, {"incid": incid})

if __name__ == "__main__":
    main()

