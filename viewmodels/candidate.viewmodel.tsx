export class CandidateViewModel {
  id: string;
  name: string;
  color: string;
  votes: number;
  image?: string;

  constructor(
    id: string,
    name: string,
    color: string,
    votes: number,
    image?: string,
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.votes = votes;
    this.image = image;
  }
}
