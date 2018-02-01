import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Models from '../models'


async function getAllAuthorsAndBooks(): Promise<Models.AuthorBooks[]> {
  //TODO 8: missing code 0.5pt
  //fix Api-call
  //bestaande uit URI(`api/......) en HTTP request body { method: 'get' ........}
  var res = await fetch(`api/Library/GetAuthorsAndBooks`, { method: 'get', credentials: 'include', headers: { 'content-type' : 'application/json'} })
  return res.json()
}

//TODO 9: missing code 1pt
//Types definiëren
//Check line 27 voor verschillende state variables en state types
type SimpleLibraryComponentState =
{
  FilterAuthorString: string,
  FilterBookString: string,
  AuthorsAndBooks: "loading" | "error" | Models.AuthorBooks[]
}

export class SimpleLibraryComponent extends React.Component<RouteComponentProps<{}>, SimpleLibraryComponentState> {
  constructor(props: RouteComponentProps<{}>, context: any) {
    super(props, context);
    this.state = { AuthorsAndBooks: "loading", FilterAuthorString: "", FilterBookString: "" }
  }

  try_download_allAuthorsAndBooks() {
    this.setState({ ... this.state, AuthorsAndBooks: "loading" },
    //TODO 10: missing code 1pt
    //callbackfunction
    //if successfull > .then
    //if not successfull > .catch
    () => getAllAuthorsAndBooks()
                                    //( ... this.state, "pick state you want to change")
      .then(result => this.setState({ ... this.state, AuthorsAndBooks: result}))
      .catch(e => this.setState({ ... this.state, AuthorsAndBooks: "error" }))
      )
  }
  componentWillMount() {
    this.try_download_allAuthorsAndBooks()
  }

  public render() {
    return <div>{
      this.state.AuthorsAndBooks == "loading" ? <div>loading...</div> :
        this.state.AuthorsAndBooks == "error" ? <div>Something went wrong while downloading...<button onClick={() => 
            //TODO 11: missing code 0.5pt
            //if state == "error" , clicking on button will try the try_download_allauthorsandbooks method again
            this.try_download_allAuthorsAndBooks()
          }>Retry</button></div> :
          <div>
            <form>
              Search author:
                <input type="text" name="name" value={this.state.FilterAuthorString} onChange={(v) => { this.setState({ ...this.state, FilterAuthorString: v.target.value }) }} />
              <div/>
              Search book:
                <input type="text" name="name" value={this.state.FilterBookString} onChange={(v) => { this.setState({ ...this.state, FilterBookString: v.target.value }) }} />
            </form>
            {this.state.AuthorsAndBooks
              .filter(a_bs => this.state.FilterAuthorString != "" ? a_bs.author.name.toLowerCase().includes(this.state.FilterAuthorString) : true)
              .map(a_bs =><div>
                <h2>Author</h2>
                <AuthorComponent Author={a_bs.author} />
                <h4>Books</h4>
                
                {a_bs.books.filter(book => this.state.FilterBookString != "" ? book.title.toLowerCase().includes(this.state.FilterBookString) : true)
                  //TODO 12: missing code 0.5pt
                  //.map kan je zien als ( for each in ....)
                  //hover over .map for explanation
                  .map(book => <div>{ book.title }</div>)
                }

              </div>)}
          </div>
    }
    </div>;
  }
}



type AuthorComponentProps = {
  Author: Models.Author
}
export class AuthorComponent extends React.Component<AuthorComponentProps, {}> {
  constructor(props: AuthorComponentProps, context: any) {
    super(props, context);
    this.state = {}
  }
  public render() {
    return <div>
      {this.props.Author.name}
      {/* {this.props.Author.gender}, */}
      {/* {this.props.Author.birth.toString()}, */}
    </div>;
  }
}

type BookComponentProps = {
  Book: Models.Book
}
export class BookComponent extends React.Component<BookComponentProps, {}> {
  constructor(props: BookComponentProps, context: any) {
    super(props, context);
    this.state = {}
  }
  public render() {
    return <div>
      { this.props.Book.title }
      {/* { this.props.Book.year } */}
    </div>;
  }
}


