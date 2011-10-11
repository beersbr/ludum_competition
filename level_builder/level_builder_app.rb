# level_builder_app

require 'sinatra'
require 'shotgun'
require 'json'
require 'pry'

get "/" do 
  File.open("./level_builder.html", "r").readlines
end

get "/save" do
  data = params[:data]
  level_data = eval(data);

  File.open("level_data.json", "w+") do |f|
    f.puts "{"
    f.puts "\t\"walls\": ["
    level_data[0..-2].each do |w|
      f.puts "\t\t{\"x\": #{w[1].to_i*10}, \"y\": #{w[2].to_i*10},\"w\": 10, \"h\": 10, \"type\": \"#{w[0]}\"},"
    end
    f.puts "\t\t{\"x\": #{level_data[-1][1].to_i*10}, \"y\": #{level_data[-1][2].to_i*10}, \"w\": 10, \"h\": 10, \"type\": \"#{level_data[-1][0]}\"}"

    f.puts "\t],"
    f.puts "\t\"start\": {\"x\": 300, \"y\": 300}"
    f.puts "}"
  end
  data
end

get "/javascripts/:lib" do 
  headers 'Content-Type' => "text/javascript"
  File.open("javascripts/#{params[:lib]}", "r").readlines
end