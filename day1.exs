[filePath] = System.argv

# Get a list of all the fuel needs from a stream of module masses
allFuelNeeds = File.stream!(filePath)
  # Remove newlines
  |> Stream.map(&String.trim/1)
  # Convert each line to integer
  |> Stream.map(&String.to_integer/1)
  # Do the math on the mass
  |> Stream.map(&(floor(&1 / 3) - 2))

# Sum up the total fuel needs and spit it out
IO.puts(Enum.sum(allFuelNeeds))
