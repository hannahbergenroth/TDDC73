import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'package:flutter/services.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var title = 'Example 1';
    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xff2D8576),
          title: Text(title),
        ),
        body: new Container(
          child: new Column(
            children: [
            new Container(
            height: 180.0,
            width: 180.0,
            margin: const EdgeInsets.only(top: 10, bottom: 20),
            alignment: Alignment.center,
            decoration: new BoxDecoration(
                image: DecorationImage(
                    image: new AssetImage('bridge.png'),
                  //  fit: BoxFit.fill,
                ),
            ),
          ),
          new Container(
             // alignment: Alignment.center,
            margin: EdgeInsets.only(top:18),
              child:  Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  RaisedButton(
                    onPressed: () {},
                    child: const Text('BUTTON'),
                  ),
                  RaisedButton(
                    onPressed: () {},
                    child: const Text('BUTTON'),
                  ),
                ],
              )
          ),
              new Container(
                  margin: EdgeInsets.only(top:16),
                  child:  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: <Widget>[
                      RaisedButton(
                        onPressed: () {},
                        child: const Text('BUTTON'),
                      ),
                      RaisedButton(
                        onPressed: () {},
                        child: const Text('BUTTON'),
                      ),
                    ],
                  )
              ),
              new Container(
                margin: EdgeInsets.only(top: 24),
                  child: Row(
                      children: <Widget>[
                        Container(
                      margin: EdgeInsets.only(left: 16.0),
                      child: Text("Email:"),
                    ),
                        Container(
                      width: 180,
                      margin: EdgeInsets.only(left: 80),
                      child: TextField(
                        cursorColor: Colors.pink,
                        decoration: InputDecoration(
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.pink, width: 2.0),
                          ),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.pink, width: 2.0),
                          ),
                        ),
                      ),
                    ),
                  ])
              ),
        ])
      )
    )
    );
  }
}
