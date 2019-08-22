export class Message {

  private text: string;
  private error?: boolean;

  constructor(text: string, error?: boolean) {
    this.text = text;
    this.error = error;
  }
}
