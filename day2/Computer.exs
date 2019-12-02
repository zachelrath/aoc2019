defmodule Computer do


  # Takes input program, which is csv-formatted,
  # and returns an output program (also csv-formatted)
  def run(program) do
    # Convert CSV into key-value store
    getMapForProgram
  end

  # Converts the program into a key-value store
  defp getMapForProgram(program) do
    String.split(program, ",")
      |> Enum.reduce(%{}, fn (x, idx) -> Map.put(programState, idx, x))
  end

end
