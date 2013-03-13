class GoLang.Models.Install
  
  constructor:(output, debug)->
    
    @kc         = KD.getSingleton "kiteController"
    {@nickname} = KD.whoami().profile
    @output     = output
    @debug      = if debug == "true" then true else false
  
  println:(content)->
    
    content += "<br />"
    output = @output
    output.setPartial content
    output.utils.wait 100, ->
      output.scrollTo
        top      : output.getScrollHeight()
        duration : 100

  getInstallationStatus: (callback)->
      @kc.run "", callback
  
  install:(domain, path, buttonCb)->
    
    filename = "go1.0.3.linux-amd64.tar.gz"
    downloadUrl = "https://go.googlecode.com/files/" + filename
    
    binDir = "/Users/#{@nickname}/bin/"
    libDir = "/Users/#{@nickname}/Library/"
    tmpDir = "/tmp"
    installDir = libDir + "go/"
    silexResourceDir = "/Users/#{@nickname}/Applications/SilexInstaller.kdapp/resources/project_template/"
    createSymlinks = "for exe in #{installDir}bin/*; do ln -s $exe #{binDir}; done"

    commands = [
      [null, "Starting installation of Go..."],
      ["mkdir -p #{libDir}; mkdir -p #{binDir};", "Checking if installation path already exists..."],
      ["cd #{tmpDir} && curl -O #{downloadUrl}", "Downloading binaries..."],
      ["rm -rf #{installDir}", "Cleaning up older installation..."],
      ["cd #{tmpDir} && tar -C #{libDir} -xzf #{filename}", "Extracting files..."],
      [createSymlinks, "Creating Symlinks..."],

      [null, "Installation done!"]
    ]
    
    self = @
    success = =>
      
      buttonCb()
    
    error = =>
      
      buttonCb()
    
    @executeCommands commands, 0, success, error
    
  executeCommands:(commands, index, success, error)->
    
    command = commands[index]
    if commands.length == index
      success()
    else
      @println command[1] if command[1] != null
      
      if command[0]

        @println command[0] if @debug == true
        
        self = @
        @kc.run command[0], (err, res)->
          self.println res if res and (err or self.debug == true)
          
          if err
            self.println err.message
            error()
          else
            self.executeCommands commands, index+1, success, error
      else
        @executeCommands commands, index+1, success, error
