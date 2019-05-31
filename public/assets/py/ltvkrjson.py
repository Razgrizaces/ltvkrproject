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
memberName = ""
prevMemberName = ""
i = 1
outputText = '{"arcs":[{'
while i is not loopNumber+1:
	fileName = "..\\texts\\ltv" + str(int(i)) + ".txt"
	try:
		ltvCol = ["korean","translation","usage", "type"]
		df = pd.read_csv(fileName, sep = "|", header = None, encoding = "utf-8")
		df.columns = ltvCol
		
		#slice the Df by grouping it by "LINK"
		linkDf = df[df.type == "LINK"]
		headers = [tuple(x) for x in linkDf.values]
		if(not(prevMemberName == headers[0][1]) and not(prevMemberName == "")):
			previousMemberName = headers[0][1]
			outputText = outputText[:len(outputText)-1]
			outputText += "],"
		if(not(headers[0][1] == memberName)):
			outputText += '"member": ' + '"' + headers[0][1] +'","ltvs":['
			memberName = headers[0][1]
		outputText += "{"
		outputText += '"title": ' + '"' + headers[0][0] +'",'
		outputText += '"link": ' + '"' + headers[0][2] +'",'
		#slice DF now by grouping it by "QUOTE"
		quoteDf = df[df.type == "QUOTE"]
		headers = [tuple(x) for x in quoteDf.values]
		outputText += '"quotes":['
		for x in headers:
			outputText += '{"korean": ' + '"' + x[0] + '",'
			outputText += '"translation": ' + '"' + x[1] + '",'
			outputText += '"timestamp": ' + '"' + x[2] + '"},'
		outputText = outputText[:len(outputText)-1]
		outputText += "],"
		#lastly slice for "DEFINITION"
		quoteDf = df[df.type == "DEFINITION"]
		headers = [tuple(x) for x in quoteDf.values]
		outputText += '"definitions":['
		for x in headers:
			outputText += '{"korean": ' + '"' + x[0] + '",'
			outputText += '"translation": ' + '"' + x[1] + '",'
			outputText += '"pos": ' + '"' + x[2] + '"},'
		outputText = outputText[:len(outputText)-1]
		outputText += "]},"
		if(prevMemberName == ""):
			prevMemberName = memberName
	#excepting if it doesn't exist, this is for me to text other LTVS out of sequence
	except FileNotFoundError:
		print("File doesn't exist... going to next file.")
		#print(fileName)
	i = i+1
#cut out the ","
outputText = outputText[:len(outputText)-1]
outputText += "]}]}"
#print(outputText)
with io.open("..\\json\\text.json", "w", encoding="utf-8") as f:
	f.write(outputText)