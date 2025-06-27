# %%
n = int(input("How big do you want your Tic Tac Toe board (e.g. 1 for small squares, 2 for larger ones, etc.): ")) #Asking user for the size! Woo!

def board(n):                                              #Defines board function, loop and nested loop below 
    for i in range(3):                                     #This starts a loop that iterates three rows for board.
        for _ in range(n):                                 #This is a nested loop that creates a range for the vertical line rows to print according to (n) Giving height for "|".
            print(n * " " + "|" + n * " " + "|" + n * " ") #This is my row to print for "|".
        if i < 2:                                          #This checks to see if it's the last row or not, if it isn't, it prints the next row, locking in the horizontal (n). 
            print((2 + 3 * n) * "-")                       #This is my horizontal line
if n < 1:                                                  #Option if smaller than 1, prints line below
    print("The number must be at least 1. Have you not played Tic Tac Toe before?")                                 
else:
    board(n)                                                           
# %%



