// Compiled by Koding Servers at Wed Mar 13 2013 05:26:52 GMT-0700 (PDT) in server time

(function() {

/* KDAPP STARTS */

/* BLOCK STARTS /Source: /Users/deltasquare4/Applications/GoLangInstaller.kdapp/app/settings.coffee */

var GoLang;

GoLang = {
  Models: {
    Install: null
  },
  Views: {
    Main: null,
    Install: null
  }
};


/* BLOCK ENDS */



/* BLOCK STARTS /Source: /Users/deltasquare4/Applications/GoLangInstaller.kdapp/app/models/install.coffee */


GoLang.Models.Install = (function() {

  function Install(output, debug) {
    this.kc = KD.getSingleton("kiteController");
    this.nickname = KD.whoami().profile.nickname;
    this.output = output;
    this.debug = debug === "true" ? true : false;
  }

  Install.prototype.println = function(content) {
    var output;
    content += "<br />";
    output = this.output;
    output.setPartial(content);
    return output.utils.wait(100, function() {
      return output.scrollTo({
        top: output.getScrollHeight(),
        duration: 100
      });
    });
  };

  Install.prototype.getInstallationStatus = function(callback) {
    return this.kc.run("", callback);
  };

  Install.prototype.install = function(domain, path, buttonCb) {
    var binDir, commands, createSymlinks, downloadUrl, error, filename, installDir, libDir, self, silexResourceDir, success, tmpDir,
      _this = this;
    filename = "go1.0.3.linux-amd64.tar.gz";
    downloadUrl = "https://go.googlecode.com/files/" + filename;
    binDir = "/Users/" + this.nickname + "/bin/";
    libDir = "/Users/" + this.nickname + "/Library/";
    tmpDir = "/tmp";
    installDir = libDir + "go/";
    silexResourceDir = "/Users/" + this.nickname + "/Applications/SilexInstaller.kdapp/resources/project_template/";
    createSymlinks = "for exe in " + installDir + "bin/*; do ln -s $exe " + binDir + "; done";
    commands = [[null, "Starting installation of Go..."], ["mkdir -p " + libDir + "; mkdir -p " + binDir + ";", "Checking if installation path already exists..."], ["cd " + tmpDir + " && curl -O " + downloadUrl, "Downloading binaries..."], ["rm -rf " + installDir, "Cleaning up older installation..."], ["cd " + tmpDir + " && tar -C " + libDir + " -xzf " + filename, "Extracting files..."], [createSymlinks, "Creating Symlinks..."], [null, "Installation done!"]];
    self = this;
    success = function() {
      buttonCb();
      return KD.utils.wait(1000, function() {
        return appManager.openFileWithApplication("https://" + self.nickname + ".koding.com/" + path, "Viewer");
      });
    };
    error = function() {
      return buttonCb();
    };
    return this.executeCommands(commands, 0, success, error);
  };

  Install.prototype.executeCommands = function(commands, index, success, error) {
    var command, self;
    command = commands[index];
    if (commands.length === index) {
      return success();
    } else {
      if (command[1] !== null) {
        this.println(command[1]);
      }
      if (command[0]) {
        if (this.debug === true) {
          this.println(command[0]);
        }
        self = this;
        return this.kc.run(command[0], function(err, res) {
          if (res && (err || self.debug === true)) {
            self.println(res);
          }
          if (err) {
            self.println(err.message);
            return error();
          } else {
            return self.executeCommands(commands, index + 1, success, error);
          }
        });
      } else {
        return this.executeCommands(commands, index + 1, success, error);
      }
    }
  };

  return Install;

})();


/* BLOCK ENDS */



/* BLOCK STARTS /Source: /Users/deltasquare4/Applications/GoLangInstaller.kdapp/app/views/main.coffee */

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GoLang.Views.Main = (function(_super) {

  __extends(Main, _super);

  function Main(options, data) {
    Main.__super__.constructor.apply(this, arguments);
    this.install = new GoLang.Views.Install({
      cssClass: "golang-view-install"
    });
    this.console = new KDScrollView({
      tagName: "pre",
      cssClass: "terminal-screen"
    });
  }

  Main.prototype.viewAppended = function() {
    var header;
    Main.__super__.viewAppended.apply(this, arguments);
    this.addSubView(header = new KDHeaderView({
      type: "big",
      title: "Install Go"
    }));
    this.addSubView(this.install);
    return this.addSubView(this.console);
  };

  return Main;

})(KDView);


/* BLOCK ENDS */



/* BLOCK STARTS /Source: /Users/deltasquare4/Applications/GoLangInstaller.kdapp/app/views/install.coffee */

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GoLang.Views.Install = (function(_super) {

  __extends(Install, _super);

  function Install() {
    this.submit = __bind(this.submit, this);
    Install.__super__.constructor.apply(this, arguments);
    this.kc = KD.getSingleton("kiteController");
    this.nickname = KD.whoami().profile.nickname;
    this.listenWindowResize();
    console.log(this);
    this.form = new KDFormViewWithFields({
      callback: this.submit.bind(this),
      buttons: {
        install: {
          title: "Install Go",
          style: "cupid-green",
          type: "submit",
          loader: {
            color: "#444444",
            diameter: 12
          }
        }
      }
    });
  }

  Install.prototype.submit = function(formData) {
    var debug, domain, model, path, self;
    domain = formData.domain, path = formData.path, debug = formData.debug;
    self = this;
    model = new GoLang.Models.Install(app.console, debug);
    return model.install(domain, path, function() {
      return self.form.buttons["Install Go"].hideLoader();
    });
  };

  Install.prototype.viewAppended = function() {
    Install.__super__.viewAppended.apply(this, arguments);
    return this.addSubView(this.form);
  };

  return Install;

})(KDView);


/* BLOCK ENDS */



/* BLOCK STARTS /Source: /Users/deltasquare4/Applications/GoLangInstaller.kdapp/index.coffee */

var app;

app = null;

(function() {
  try {
    return appView.addSubView(app = new GoLang.Views.Main({
      cssClass: "golang-installer"
    }));
  } catch (error) {
    return new KDNotificationView({
      title: error
    });
  }
})();


/* BLOCK ENDS */

/* KDAPP ENDS */

}).call();