using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Threading;
using Newtonsoft.Json;
using AdaptiveCards;
using System.Collections.Generic;

namespace moby_bot.Dialogs
{
    [Serializable]
    public class RootDialog : IDialog<object>
    {
        public Task StartAsync(IDialogContext context)
        {
            context.Wait(MessageReceivedAsync);

            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
        {
            var activity = await result as Activity;

            //Call GetQnaReply to get the result
            QnAMakerResult QnaMakeReply = QnaMaker.GetQnaReply(activity);

            //Reply to user
            string QnaAnswer = QnaMakeReply.Answer;
            await context.PostAsync(QnaAnswer.Substring(2, QnaAnswer.Length - 2));

            //Test Adaptive Card
            //var heroCard = new HeroCard
            //{
            //    Text = "Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.",
            //    Buttons = new List<CardAction> { new CardAction("imBack", "Yes", value: "Yes"), new CardAction("imBack", "No", value: "No") }
            //};

            var heroCard = new ThumbnailCard
            {
                Title = "BotFramework Thumbnail Card",
                Subtitle = "Your bots — wherever your users are talking",
                Text = "Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.",
                Images = new List<CardImage> { new CardImage("https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg") },
                Buttons = new List<CardAction> { new CardAction(ActionTypes.OpenUrl, "Get Started", value: "https://docs.microsoft.com/bot-framework"), new CardAction(ActionTypes.OpenUrl, "Get Started", value: "https://docs.microsoft.com/bot-framework") }
            };

            Activity replyToConversation = activity.CreateReply();
            // Create the attachment.
            Attachment attachment = heroCard.ToAttachment();
            replyToConversation.Attachments.Add(attachment);
            await context.PostAsync(replyToConversation);
            //-----------------------------------------------------


            //2nd Level Reply
            string scenarioCode = QnaAnswer.Substring(0, 2);
            switch (scenarioCode)
            {
                case "11":
                    Thread.Sleep(3000);
                    await context.PostAsync("Would you like me to help you allocate this transaction to the right account?");
                    break;
            }

            context.Wait(MessageReceivedAsync);
        }
    }
}