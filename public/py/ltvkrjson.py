import pandas as pd
import json
import io

#how many ltvs are you loading?
loopNumber = 0
while loopNumber == 0:
	try:
		loopNumber = int(input("How many LTVs are you loading? "))

	except ValueError:
		print("Please type a number.")

#prepare file to load

i = 1
outputText = '{"ltvs":['
while i is not loopNumber+1:
	fileName = "..\\texts\\ltv" + str(int(i)) + ".txt"
	try:
		ltvCol = ["korean","translation","usage", "type"]
		df = pd.read_csv(fileName, sep = "|", header = None, encoding = "utf-8")
		outputText+="{"
		df.columns = ltvCol
		linkDf = df[df.type == "LINK"]
		headers = [tuple(x) for x in linkDf.values]
		outputText += '"title": ' + '"' + headers[0][0] +'",'
		outputText += '"member": ' + '"' + headers[0][1] +'",'
		outputText += '"link": ' + '"' + headers[0][2] +'",'
		print(outputText)
		
		outputText +="},"
	except FileNotFoundError:
		print("File doesn't exist... going to next file.")
		#print(fileName)
	i = i+1
#cut out the ","
outputText = outputText[:len(outputText)-1]
outputText += "]}"
print(outputText)
with io.open("..\\text.json", "w", encoding="utf-8") as f:
	f.write(outputText)