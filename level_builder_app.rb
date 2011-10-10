# level_builder_app

require 'sinatra'

get "/" do 
  File.open("./level_builder.html", "r").readlines
end

get "/save" do
  data = []
end

get "/javascripts/:lib" do 
  headers 'Content-Type' => "text/javascript"
  File.open("javascripts/#{params[:lib]}", "r").readlines
end