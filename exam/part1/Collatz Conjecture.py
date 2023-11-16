"""
Define a function to generate the Collatz sequence for a given number
inputs: A positive integer array
returns: A list containing the Collatz sequence
"""
def collatz_sequence(n):
    
    sequence = [n]
    while n > 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        sequence.append(n)
    return sequence

#Plotting (make sure your environment supports matplotlib)
if __name__ == "__main__":
    import matplotlib.pyplot as plt

    # Generate Collatz sequences
    sequences = {n: collatz_sequence(n) for n in range(3, 31, 3)}

    # Plotting the Collatz sequences
    plt.figure(figsize=(14, 8))
    for n, sequence in sequences.items():
        plt.plot(range(len(sequence)), sequence, label=f'n={n}')

    plt.xlabel('Step')
    plt.ylabel('Value')
    plt.title('Collatz Conjecture Sequences')
    plt.legend()
    plt.grid(True)
    plt.show()
