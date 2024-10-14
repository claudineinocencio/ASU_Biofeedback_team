import numpy as np
import matplotlib.pyplot as plt

# Define the parameters for the sine wave
frequency = 5  # Frequency in Hertz
amplitude = 1  # Amplitude of the sine wave
duration = 2   # Duration in seconds
sampling_rate = 1000  # Number of samples per second

# Generate the time values
t = np.linspace(0, duration, int(sampling_rate * duration), endpoint=False)

# Generate the sine wave
y = amplitude * np.sin(2 * np.pi * frequency * t)

# Plot the sine wave
plt.figure(figsize=(10, 4))
plt.plot(t, y)
plt.title('Sine Wave Visualizer')
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.grid(True)
plt.show()
