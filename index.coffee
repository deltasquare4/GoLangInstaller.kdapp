app = null

do ->
  try
    appView.addSubView app = new GoLang.Views.Main
      cssClass  : "golang-installer"

  catch error
    new KDNotificationView
      title: error
