def iseven(n):
    if n % 2 == 0:
        return True
    else:
        return False

n = 100
mysum = 0

for i in range(1, n+1):
    if iseven(i):
        mysum += i

print(mysum)

mylist = range(2, n+1, 2)

sum(mylist) == mysum