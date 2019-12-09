defmodule Day4 do
  def nonDecreasing({nil,_}), do: true
  def nonDecreasing({a,b}), do: b >= a
  def adjacentDigitsEqual({nil,_}), do: false
  def adjacentDigitsEqual({a,b}), do: a == b
  def getPairs(x) do
    chars = Integer.digits(x)
    chars2 = [nil | Enum.slice(chars, 0, length(chars) - 1)]
    Enum.zip(chars2, chars)
  end
  def filter(tuples) do
    if Enum.all?(tuples, &Day4.nonDecreasing/1) do
      Enum.any?(tuples, &Day4.adjacentDigitsEqual/1)
    else
      false
    end
  end
  def filter2(x) do
    [a,b,c,d,e,f] = Integer.digits(x)
    if (b >= a and c >= b and d >= c and e >= d and f >= e) do
      # Now ensuring that we have at least one set of 2 adjacent digits
      # which are identical but which are not part of a 3+ run of identical digits
      cond do
        a == b and b != c -> true
        b == c and a != b and c != d -> true
        c == d and b != c and d != e -> true
        d == e and c != d and e != f -> true
        e == f and d != e -> true
        true -> false
      end
    end
  end

  def part1(min \\ 109165, max \\ 576723) do
    IO.puts("Running Day 4, Part 1 tests...")
    Enum.each([
      { 111111, true},
      { 223450, false},
      { 123789, false}
    ], fn {input, expected} -> if (Day4.filter(Day4.getPairs(input)) != expected), do: raise("Test failed: #{input}") end)
    IO.puts("Finding number of possible passwords...")

    part1Result = length(
      Enum.map(min..max, &Day4.getPairs/1)
        |> Enum.filter(&Day4.filter/1)
    )

    IO.puts("Day 4, Part 1 result: #{part1Result}")
  end
  def part2(min \\ 109165, max \\ 576723) do
    IO.puts("Running Day 4, Part 2 tests...")
    Enum.each([
      { 111111, false},
      { 112233, true},
      { 123444, false},
      { 111122, true},
      { 111233, true},
      { 111233, true},
      { 355555, false}
    ], fn {input, expected} -> if (Day4.filter2(input) != expected), do: raise("Test failed: #{input}") end)
    IO.puts("Finding number of possible passwords...")
    part2Result = length(
      Enum.filter(min..max, &Day4.filter2/1)
    )
    IO.puts("Day 4, Part 2 result: #{part2Result}")
  end
end

Day4.part1()
Day4.part2()
