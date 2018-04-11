# Tools to support framework operations or for help with custom/manual scripts

# This toolset does not contain any executable logic. It must be imported and
# and called in your own script or one of the default in the framework.

DOM_DELIM_1 = "_BEGIN_DOM_"
DOM_DELIM_2 = "_END_DOM_"
HTTP_DELIM = "_HTTP_REQUEST_"
HTTP_DELIM_2 = "END_HTTP_REQUEST_" # Scalpel has not been implemented to use yet
LOG_DELIM_1 = '{"level": "SEVERE", "message": '
LOG_DELIM_2 = '"source"'

def strip_JSON(entry):
    """ Removes the console.log JSON format from either a HTTP request or
        log entry. This function should be used when you don't want to
        differentiate between requests and logs in your own program. """
    stripped_entry = ""
    if HTTP_DELIM in entry: # detected entry is an HTTP request
        split_entry = entry.split('\\"')
        for i in range(0, len(split_entry)):
            if HTTP_DELIM in split_entry[i]:
                stripped_entry = split_entry[i]
    else:                   # detected entry is a console log
        split_entry = entry.split(LOG_DELIM_1)
        for i in range(0, len(split_entry)):
            if LOG_DELIM_2 in split_entry[i]:
                split_entry_again = split_entry[i].split(LOG_DELIM_2)
                #for i in range(0, len(split_entry_again)):
                stripped_entry = split_entry_again[0]

    return stripped_entry

def strip_http_request_entry(entry):
    """ Removes the console.log JSON format from a HTTP request entry. """
    stripped_entry = ""
    split_entry = entry.split('\\"')
    for i in range(0, len(split_entry)):
        if HTTP_DELIM in split_entry[i]:
            stripped_entry = split_entry[i]
    return stripped_entry

def strip_log_entry(entry):
    """ Removes the console.log JSON format from a log entry. """
    stripped_entry = ""
    split_entry = entry.split(LOG_DELIM_1)
    for i in range(0, len(split_entry)):
        if LOG_DELIM_2 in split_entry[i]:
            split_entry_again = split_entry[i].split(LOG_DELIM_2)
            #for i in range(0, len(split_entry_again)):
            stripped_entry = split_entry_again[0]
    return stripped_entry

def strip_DOM(dom):
    """ Removes the console.log JSON format from a DOM entry """
    """ THIS FUNCTION IS NOT READY FOR USE AND WILL RETURN AN EMPTY STRING """
    stripped_dom = ""

    return stripped_dom

def format_DOM_to_JSON(dom):
    """ Takes a single line string of a DOM collected by Biopsy and returns
        a multi-line, easier-to-view string. The parameter must be a string
        and not a dict object. """
    formatted_dom = ""

    dom_break = dom.split("}")
    for i in range(0, len(dom_break)):
        if (i == 0):
            formatted_dom = formatted_dom + dom_break[i]
        else:
            formatted_dom = formatted_dom + "\n}\n" + dom_break[i]

    dom_break_again = formatted_dom.split("{")
    formatted_dom = ""
    for i in range(0, len(dom_break_again)):
        if (i == 0):
            formatted_dom = formatted_dom + dom_break_again[i]
        else:
            formatted_dom = formatted_dom + "\n{\n" + dom_break_again[i]

    return formatted_dom

def count_http_requests(output_file_name):
    """ Opens output_file_name and prints count of number of HTTP requests."""
    num_requests = 0
    output_object = open(output_file_name, 'r')
    
    for line in output_object:
        if HTTP_DELIM in line:
            num_requests += 1

    print("Number of HTTP Requests in %s is: %d" % (output_file_name,num_requests))



