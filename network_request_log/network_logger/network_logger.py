#!/usr/bin/env python

import sys
import json
import struct


# Can change file name to specify date/time when run?
outputFile = open("output.txt", "w+")
outputFile.write("Network requests for open tab: \n\n")

try:
    # Python 3.x version
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.buffer.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.buffer.read(messageLength).decode('utf-8')
        
        # Unpack message and write to output file
        toWrite = json.loads(message)
        outputFile.write(toWrite)
        outputFile.write("\n")

        return toWrite
    
    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}
    
    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()
    
    while True:
        receivedMessage = getMessage()
        if receivedMessage == "ping":
            sendMessage(encodeMessage("pong3"))

except AttributeError:
    # Python 2.x version (if sys.stdin.buffer is not defined)
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.read(4)

        if len(rawLength) == 0:
            sendMessage(encodeMessage("PYTHON SCRIPT: Length of message was 0. Exiting"))
            sys.exit(0)
        
        messageLength = struct.unpack('@I', rawLength)[0]

        message = sys.stdin.read(messageLength)

        # Unpack message and write to output file
        toWrite = json.loads(message)
        outputFile.write(toWrite)
        outputFile.write("\n")
    
        return toWrite
    
    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent)
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}
    
    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.write(encodedMessage['length'])
        sys.stdout.write(encodedMessage['content'])
        sys.stdout.flush()
    
    while True:
        receivedMessage = getMessage()

        if len(receivedMessage) > 0:
            sendMessage(encodeMessage("PYTHON SCRIPT: Network request received, writing to file."))
        else:
            sendMessage(encodeMessage("PYTHON SCRIPT: Error receiving message."))

    outputFile.close()
