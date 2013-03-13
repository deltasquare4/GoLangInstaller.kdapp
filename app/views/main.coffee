# Main View
class GoLang.Views.Main extends KDView

  constructor:(options, data)->

    super

    @install = new GoLang.Views.Install
      cssClass : "golang-view-install"

    @console = new KDScrollView
      tagName  : "pre"
      cssClass : "terminal-screen"

  viewAppended:->
    
    super
    
    @addSubView header = new KDHeaderView type : "big", title : "Install Go"
    @addSubView @install
    @addSubView @console
