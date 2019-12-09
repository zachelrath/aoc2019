defmodule Day6 do

  def buildMap(filePath) do
    File.stream!(filePath, [:read_ahead], :line)
      # Remove newlines
      |> Stream.map(&String.trim/1)
      # Convert each line to the two parts of the orbit
      |> Stream.map(fn x -> String.split(x, ")") end)
      # Split into tuples so that we can use into()
      # to compose a map from each object to its parent
      |> Stream.map(fn [parent,object] -> {object,parent} end)
      |> Enum.into(%{})
  end

  defp countParents(_, nil, accumulator) do
    accumulator
  end

  defp countParents(objects, curr, accumulator) do
    parent = Map.get(objects, curr)
    countParents(objects, parent, accumulator + 1)
  end

  defp buildAncestorTree(_, nil) do
    []
  end
  defp buildAncestorTree(objects, item) do
    parent = Map.get(objects, item)
    [parent | buildAncestorTree(objects, parent)]
  end

  def part1(objects) do
    Enum.reduce(objects, 0, fn { _, parent }, acc -> countParents(objects, parent, acc) end)
  end
  def part2(objects) do
    # Build the ancestry trees of YOU and SAN
    youTree = Enum.reverse(buildAncestorTree(objects, Map.get(objects, "YOU")))
    santaTree = Enum.reverse(buildAncestorTree(objects, Map.get(objects, "SAN")))
    commonAncestors = Enum.zip(youTree, santaTree)

    # Find their common ancestors using Enum.zip,
    # which will stop zipping once we get to a divergence,
    # and subtract that distance from the two tree lengths
    length(youTree) + length(santaTree) + 2 - (length(commonAncestors)-1 * 2)

  end

end

objects = Day6.buildMap("input.txt")
part1 = Day6.part1(objects)
part2 = Day6.part2(objects)
IO.puts("Part 1: " <> to_string(part1))
IO.puts("Part 2: " <> to_string(part2))
