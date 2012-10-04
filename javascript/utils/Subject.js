//http://www.codeproject.com/Articles/13914/Observer-Design-Pattern-Using-JavaScript

function Subject()
{
   this.observers = new ArrayList();
}

// Context represents an object instance (Ball in our case) 
Subject.prototype.Notify = function( context )
{
   var m_count = this.observers.Count();
            
   for( var i = 0; i < m_count; i++ )
      this.observers.GetAt(i).Update( context );
}

Subject.prototype.AddObserver = function( observer )
{
   if( !observer.Update )
      throw 'Wrong parameter';

   this.observers.Add( observer );
}

Subject.prototype.RemoveObserver = function( observer )
{
   if( !observer.Update )
      throw 'Wrong parameter';
   
   this.observers.RemoveAt(this.observers.IndexOf( observer, 0 ));
}
