import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "../../env";
import { Card, Button } from "@rneui/base";
let BOT = {
  _id: 2,
  name: "AgriBot",
};

class ChatBot extends Component {
  state = {
    messages: [
      { _id: 2, text: "Hie !", createdAt: new Date().getTime(), user: BOT },
      {
        _id: 1,
        text: "My Name Is AgriBot I'm Here To Assist You In Suggesting Best Farming Practices That Can Help Improve Your Farm Yield.",
        createdAt: new Date().getTime(),
        user: BOT,
      },
    ],
    id: 1,
    name: "",
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  sendBotResponse(text) {
    // let msg = {
    //   _id: this.state.messages.length + 1,
    //   text,
    //   image: "https://www.ifpri.org/themes/custom/ifpri/logo.png",
    //   createAt: new Date(),
    //   user: BOT,
    // };
    let msg;

    if (text == "travel") {
      msg = {
        _id: this.state.messages.length + 1,
        text: "Would you like to buy \n a plane ticket?",
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else if (text == "show options") {
      msg = {
        _id: this.state.messages.length + 1,
        text: "please choose your destination",
        createdAt: new Date().getTime(),
        user: BOT,
        isOptions: true,
        data: [
          {
            title: "Malawi",
            image:
              "https://images.blacktomato.com/2018/04/Kaya-Mawa.jpg?auto=compress%2Cformat&fit=crop&h=424&ixlib=php-3.3.0&w=722&s=5b317c6e53267571539dcaaf834bce3e",
          },
          {
            title: "USA",
            image:
              "https://www.worldisavillage.com/wp-content/uploads/2020/04/USA_Worldisavillage-scaled.jpg",
          },
          {
            title: "Thailand",
            image:
              "https://www.brinknews.com/wp-content/uploads/2022/02/Shibuya-Japan_jezael-melgoza-alY6_OpdwRQ-unsplash.jpg",
          },
        ],
      };
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }

    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }));
  }

  onSend(messages = []) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }

  onQuickReply(quickReply) {
    this.setState((previouseState) => ({
      message: GiftedChat.append(previouseState.message, quickReply),
    }));

    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }
  renderBubble = (props) => {
    if (props.currentMessage.isOptions) {
      return (
        <ScrollView style={{ backgroundColor: "white" }} horizontal={true}>
          {props.currentMessage.data.map((item) => (
            <Card
              containerStyle={{
                padding: 0,
                borderRadius: 15,
                paddingBottom: 0, 
                overflow: "hidden",
              }}
              key={item.title}
            >
              <Card.Image
                style={{ width: 220, height: 110 }}
                resizeMode="cover"
                source={{ uri: item.image }}
              ></Card.Image>
              <Card.Divider />
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Button
                title="choose"
                style={{ height: 35 }}
                onPress={() => this.sendBotResponse(item.title)}
              />
            </Card>
          ))}
        </ScrollView>
      );
    }
    return (
      <Bubble
        {...props}
        textStyle={{ right: { color: "white" }, left: { color: "white" } }}
        wrapperStyle={{
          left: { backgroundColor: "#76b5c5" },
          right: { backgroundColor: "#1e81b0" },
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.chatBotContainer}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          renderBubble={this.renderBubble}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          user={{ _id: 1 }}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  chatBotContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ChatBot;
