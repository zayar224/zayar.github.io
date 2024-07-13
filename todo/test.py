col = "|"
row = "__"

#Last Column
for _ in range(8):
    for _ in range(8):
        for _ in range(1):
            print(col, end="")
        print(row, end="")
    print(col)

# for i in range(3):
#     for j in range(1):
#         for k in range(1):
#             print(column, end="")
#         print(row, end="")
#     print(column)