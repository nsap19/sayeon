from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials

from array import array
import os
from PIL import Image
import sys
import time

subscription_key = "32d0f03624d14f1f874927def4412b65"
endpoint = "https://sayeon.cognitiveservices.azure.com/"

computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

remote_image_url = "https://w.namu.la/s/f8211f25147a509e952edb75c36dac8f4d69ca4dd1e08fabbeafe202b029da98ba00b372c604a9698723a26210ed58d8796260c5217d5e403f562ea4ecf74dbeb495387437076c2df36ed42d4007c2b156c55166dd7d25c217e873e524c1571d"
'''
Tag an Image - remote
This example returns a tag (key word) for each thing in the image.
'''
print("===== Tag an image - remote =====")
# Call API with remote image
tags_result_remote = computervision_client.tag_image(remote_image_url )

# Print results with confidence score
print("Tags in the remote image: ")
if (len(tags_result_remote.tags) == 0):
    print("No tags detected.")
else:
    for tag in tags_result_remote.tags:
        print("'{}' with confidence {:.2f}%".format(tag.name, tag.confidence * 100))

"""
########### Python 3.2 #############
import http.client, urllib.request, urllib.parse, urllib.error, base64

headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '32d0f03624d14f1f874927def4412b65',
}

params = urllib.parse.urlencode({
    # Request parameters
    'language': 'ko',
    'model-version': 'latest',
})

try:
    conn = http.client.HTTPSConnection('*.cognitiveservices.azure.com')
    conn.request("POST", "/vision/v3.2/tag?%s" % params, '{"url":"https://w.namu.la/s/f8211f25147a509e952edb75c36dac8f4d69ca4dd1e08fabbeafe202b029da98ba00b372c604a9698723a26210ed58d8796260c5217d5e403f562ea4ecf74dbeb495387437076c2df36ed42d4007c2b156c55166dd7d25c217e873e524c1571d"}', headers)
    response = conn.getresponse()
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

####################################
"""