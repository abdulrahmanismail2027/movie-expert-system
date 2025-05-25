import pycurl
from io import BytesIO
from urllib.parse import urlencode
import json

def pycurl_get(url, params=None) -> dict | None:
    if params:
        url = url + '?' + urlencode(params)

    buffer = BytesIO()
    c = pycurl.Curl()
    c.setopt(pycurl.URL, url)
    c.setopt(pycurl.WRITEDATA, buffer)
    try:
        c.perform()
    finally:
        c.close()

    response = json.loads(buffer.getvalue().decode())
    return response