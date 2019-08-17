import os
import re

base = 24
new_code = ""
symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()"
with open("beginning.html", 'r') as file_object:
    new_code = file_object.read()
with open("base5.html", 'r') as file:
    lines = file.readlines()
    onButtons = False
    for line in lines:
        if re.findall("<h1>Calculator", line) != []:
            new_code += "\n" + line
            new_code += "\n" + "<h2>Base " + str(base) + "</h2>"
            new_code += "\n" + "<div id=\"base\" data-value=\""+ str(base) + "\"></div>"
            onButtons = True
        elif onButtons:
            if re.findall("<button type=\"button\" value=", line) != []:
                value = int(line[line.index("value=")+7])
                if value < base:
                    new_code += line
                if value == 0 and base > 10:
                    for i in range(base-10):
                        new_code += "\n\t\t\t\t<button type=\"button\" value=\"" + str(10 +i) + "\">" + symbols[10+i] + "</button>"
                    new_code += "\n"
            elif re.findall("class=\"decimal\"", line) == []:
                new_code += line

with open("new24.html", 'w') as newFile:
    newFile.write(new_code)