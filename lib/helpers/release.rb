require 'open-uri'
require 'rubygems'
require 'json'
require 'date'

module ReleaseHelper
  def release(group, artifact, type)
    file = open('http://search.maven.org/solrsearch/select?q=g:%22'+ group +'%22+AND+a:%22'+ artifact +'%22&rows=20&wt=json')
    parsed = JSON.parse(file.read)
    if type != 'timestamp'
      parsed['response']['docs'][0][type]
    else
      DateTime.strptime(parsed['response']['docs'][0][type].to_s[0,10],'%s')
    end
  end
end