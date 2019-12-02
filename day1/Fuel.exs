defmodule Fuel do

  defp getFuelForMass(mass) do
    fuel = floor(mass / 3) - 2
    cond do
      fuel >= 0 -> [fuel] ++ getFuelForMass(fuel)
      fuel < 0 -> [0]
    end
  end

  def compute(mass) do
    Enum.sum(getFuelForMass(mass))
  end

end
