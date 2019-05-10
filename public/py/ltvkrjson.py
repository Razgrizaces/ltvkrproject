import pandas as pd

#how many ltvs are you loading?
loopNumber = 0
while loopNumber != 0:
	try:
		loopNumber = int(input("How many LTVs are you loading?"))

	except ValueError:
		print("Please type a number.")

#prepare file to load

i = 1
while i is not loopNumber:
	fileName = "..\\texts\\ltv" + str(i) + ".txt"
	ltvCol = {"korean", "translation", "usage", "type"}
	dataFrame = pd.readCsv(fileName, sep = "|", header = "None", columns = ltvCol)
	print(dataFrame)