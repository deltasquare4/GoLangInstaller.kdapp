
# Install View
class GoLang.Views.Install extends KDView

  constructor:->
    super
    
    @kc         = KD.getSingleton "kiteController"
    {@nickname} = KD.whoami().profile
    
    @listenWindowResize()
    
    console.log(@)

    @form = new KDFormViewWithFields
      callback            : @submit.bind(@)
      buttons             :
        install           :
          title           : "Install Go"
          style           : "cupid-green"
          type            : "submit"
          loader          :
            color         : "#444444"
            diameter      : 12

  submit:(formData)=>

    {domain, path, debug} = formData

    self = @
    model = new GoLang.Models.Install app.console, debug
    model.install domain, path, ->
      self.form.buttons["Install Go"].hideLoader()

  viewAppended:->
    
    super
    
    @addSubView @form